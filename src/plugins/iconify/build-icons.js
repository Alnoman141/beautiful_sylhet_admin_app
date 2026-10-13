
/**
 * Advanced example for creating icon bundles for Iconify SVG Framework.
 *
 * Creates a bundle from:
 * - SVG files in a directory
 * - Custom JSON files
 * - Iconify icon sets
 *
 * Documentation:
 * https://docs.iconify.design/tools/tools2/
 */

import { promises as fs } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

import {
    cleanupSVG,
    importDirectory,
    isEmptyColor,
    parseColors,
    runSVGO,
} from '@iconify/tools';

import {
    getIcons,
    getIconsCSS,
    stringToIcon,
} from '@iconify/utils';

// --------------------------------------------------
// ES Module compatibility
// --------------------------------------------------

const require = createRequire(import.meta.url);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// --------------------------------------------------
// Icon sources configuration
// --------------------------------------------------

const sources = {
    svg: [
        {
            dir: 'src/assets/images/iconify-svg',
            monotone: false,
            prefix: 'custom',
        },

        // Example:
        // {
        //     dir: 'emojis',
        //     monotone: false,
        //     prefix: 'emoji',
        // },
    ],

    icons: [
        // Add individual icons here if needed:
        // 'mdi:home',
        // 'mdi:account',
        // 'mdi:login',
        // 'mdi:logout',
        // 'octicon:book-24',
        // 'octicon:code-square-24',
    ],

    json: [
        // Include all Tabler icons.
        require.resolve('@iconify-json/tabler/icons.json'),

        // Include selected Font Awesome icons.
        {
            filename: require.resolve('@iconify-json/fa/icons.json'),
            icons: [
                'facebook',
                'google',
                'twitter',
                'circle',
            ],
        },

        // Example: Include selected Line MD icons.
        // {
        //     filename: require.resolve('@iconify-json/line-md/icons.json'),
        //     icons: [
        //         'home-twotone-alt',
        //         'github',
        //         'document-list',
        //         'document-code',
        //         'image-twotone',
        //     ],
        // },
    ],
};

// --------------------------------------------------
// Output configuration
// --------------------------------------------------

const target = join(__dirname, 'icons.css');

// --------------------------------------------------
// Main build function
// --------------------------------------------------

async function buildIcons() {
    // Ensure the output directory exists.
    await fs.mkdir(dirname(target), {
        recursive: true,
    });

    const allIcons = [];

    // --------------------------------------------------
    // Convert individual icon names into JSON sources.
    // --------------------------------------------------

    if (sources.icons?.length) {
        const sourcesJSON = sources.json ?? (sources.json = []);

        const organizedList = organizeIconsList(sources.icons);

        for (const prefix of Object.keys(organizedList)) {
            const filename = require.resolve(
                `@iconify/json/json/${prefix}.json`,
            );

            sourcesJSON.push({
                filename,
                icons: organizedList[prefix],
            });
        }
    }

    // --------------------------------------------------
    // Load JSON icon sets.
    // --------------------------------------------------

    if (sources.json?.length) {
        for (const item of sources.json) {
            const filename =
                typeof item === 'string' ? item : item.filename;

            const content = JSON.parse(
                await fs.readFile(filename, 'utf8'),
            );

            // Adjust Tabler icon stroke width.
            if (content.prefix === 'tabler') {
                for (const icon of Object.values(content.icons)) {
                    icon.body = icon.body.replace(
                        /stroke-width="2"/g,
                        'stroke-width="1.5"',
                    );
                }
            }

            // Filter icons when a specific list is provided.
            if (typeof item !== 'string' && item.icons?.length) {
                const filteredContent = getIcons(
                    content,
                    item.icons,
                );

                if (!filteredContent) {
                    throw new Error(
                        `Cannot find required icons in ${filename}`,
                    );
                }

                allIcons.push(filteredContent);
            } else {
                allIcons.push(content);
            }
        }
    }

    // --------------------------------------------------
    // Import and optimise custom SVG files.
    // --------------------------------------------------

    if (sources.svg?.length) {
        for (const source of sources.svg) {
            const iconSet = await importDirectory(source.dir, {
                prefix: source.prefix,
            });

            // Process each icon and wait for all operations.
            await iconSet.forEach(async (name, type) => {
                if (type !== 'icon') {
                    return;
                }

                const svg = iconSet.toSVG(name);

                if (!svg) {
                    iconSet.remove(name);
                    return;
                }

                try {
                    // Clean up SVG markup.
                    await cleanupSVG(svg);

                    // Convert colours to currentColor if monotone.
                    if (source.monotone) {
                        await parseColors(svg, {
                            defaultColor: 'currentColor',

                            callback: (attr, colorStr, color) => {
                                return !color || isEmptyColor(color)
                                    ? colorStr
                                    : 'currentColor';
                            },
                        });
                    }

                    // Optimise SVG markup.
                    await runSVGO(svg);

                    // Update the icon set with the optimised SVG.
                    iconSet.fromSVG(name, svg);
                } catch (err) {
                    console.error(
                        `Error parsing icon "${name}" from "${source.dir}":`,
                        err,
                    );

                    iconSet.remove(name);
                }
            });

            allIcons.push(iconSet.export());
        }
    }

    // --------------------------------------------------
    // Generate CSS for all icon sets.
    // --------------------------------------------------

    const cssContent = allIcons
        .map((iconSet) =>
            getIconsCSS(
                iconSet,
                Object.keys(iconSet.icons),
                {
                    iconSelector: '.{prefix}-{name}',
                    mode: 'mask',
                },
            ),
        )
        .join('\n');

    // --------------------------------------------------
    // Write the generated CSS file.
    // --------------------------------------------------

    await fs.writeFile(target, cssContent, 'utf8');

    console.log(`Icon CSS generated successfully: ${target}`);
}

// --------------------------------------------------
// Sort individual icon names by prefix.
// --------------------------------------------------

function organizeIconsList(icons) {
    const sorted = Object.create(null);

    icons.forEach((icon) => {
        const item = stringToIcon(icon);

        if (!item) {
            return;
        }

        const { prefix, name } = item;

        if (!sorted[prefix]) {
            sorted[prefix] = [];
        }

        if (!sorted[prefix].includes(name)) {
            sorted[prefix].push(name);
        }
    });

    return sorted;
}

// --------------------------------------------------
// Run the build.
// --------------------------------------------------

buildIcons().catch((err) => {
    console.error('Failed to build Iconify CSS:', err);
    process.exitCode = 1;
});
