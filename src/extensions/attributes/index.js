/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
const { addFilter } = wp.hooks;
const { Fragment } = wp.element;
const { createHigherOrderComponent } = wp.compose;
const { hasBlockSupport } = wp.blocks;

const restrictedBlocks = [ 'core/freeform', 'core/shortcode', 'core/nextpage' ];
const blocksWithFullScreen = [ 'core/image', 'core/cover', 'core/group', 'core/columns', 'core/media-text' ];
const blocksWithFontSize = [ 'core/list' ];
const blocksWithBulletColor = [ 'core/list' ];
const blocksWithAnchor = [ 'core/spacer', 'core/separator' ];
const blocksWithBackgroundColor = [ 'core/columns', 'core/column' ];
const blocksWithFullWidth = [ 'core/button' ];

/**
 * Filters registered block settings, extending attributes with anchor using ID
 * of the first node.
 *
 * @param {Object} settings Original block settings.
 *
 * @return {Object} Filtered block settings.
 */
function addAttributes( settings ) {
	if ( typeof settings.attributes !== 'undefined' && ! restrictedBlocks.includes( settings.name ) ) {
		settings.attributes = Object.assign( settings.attributes, {
			sidetrack: {
				type: 'object',
				default: {
					devices: false,
					desktop: true,
					tablet: true,
					mobile: true,
					loggedin: true,
					loggedout: true,
					acf_visibility: '',
					acf_field: '',
					acf_condition: '',
					acf_value: '',
					migrated: false,
					unit_test: false,
				},
			},
		} );

		// for version 1 compatibility and migration.
		settings.attributes = Object.assign( settings.attributes, {
			blockOpts: { type: 'object' },
		} );

		// Add vertical full screen support.
		if ( blocksWithFullScreen.includes( settings.name ) ) {
			if ( ! settings.supports ) {
				settings.supports = {};
			}
			settings.supports = Object.assign( settings.supports, {
				hasHeightFullScreen: true,
			} );
		}

		if ( hasBlockSupport( settings, 'hasHeightFullScreen' ) ) {
			if ( typeof settings.attributes !== 'undefined' ) {
				if ( ! settings.attributes.isHeightFullScreen ) {
					settings.attributes = Object.assign( settings.attributes, {
						isHeightFullScreen: {
							type: 'boolean',
							default: false,
						},
					} );
				}
			}
		}

		// Add full width display support.
		if ( blocksWithFullWidth.includes( settings.name ) ) {
			if ( ! settings.supports ) {
				settings.supports = {};
			}
			settings.supports = Object.assign( settings.supports, {
				hasFullWidthDisplay: true,
			} );
		}

		if ( hasBlockSupport( settings, 'hasFullWidthDisplay' ) ) {
			if ( typeof settings.attributes !== 'undefined' ) {
				if ( ! settings.attributes.isFullWidth ) {
					settings.attributes = Object.assign( settings.attributes, {
						isFullWidth: {
							type: 'boolean',
							default: false,
						},
					} );
				}
			}
		}

		// Add custom font size picker on selected blocks.
		if ( blocksWithFontSize.includes( settings.name ) ) {
			if ( ! settings.attributes ) {
				settings.attributes = {};
			}
			settings.attributes = Object.assign( settings.attributes, {
				textColor: {
					type: 'string',
				},
				customTextColor: {
					type: 'string',
				},
				fontSize: {
					type: 'string',
				},
				customFontSize: {
					type: 'number',
				},
			} );
		}

		// Add Bullet Color
		if ( blocksWithBulletColor.includes( settings.name ) ) {
			if ( ! settings.attributes ) {
				settings.attributes = {};
			}
			settings.attributes = Object.assign( settings.attributes, {
				bulletColor: {
					type: 'string',
				},
			} );
		}

		// Add background color on selected blocks.
		if ( blocksWithBackgroundColor.includes( settings.name ) ) {
			if ( ! settings.attributes ) {
				settings.attributes = {};
			}
			settings.attributes = Object.assign( settings.attributes, {
				backgroundColor: {
					type: 'string',
				},
				customBackgroundColor: {
					type: 'string',
				},
			} );
		}

		//enable anchor to selected blocks
		if ( blocksWithAnchor.includes( settings.name ) ) {
			if ( ! settings.supports ) {
				settings.supports = {};
			}
			settings.supports = Object.assign( settings.supports, {
				anchor: true,
			} );
		}
	}

	return settings;
}

/**
 * Add custom Sidetrack attributes to selected blocks
 *
 * @param {Function} BlockEdit Original component.
 * @return {string} Wrapped component.
 */
const withAttributes = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		const {
			attributes,
		} = props;

		if ( typeof attributes.sidetrack === 'undefined' ) {
			attributes.sidetrack = [];
		}

		return (
			<Fragment>
				<BlockEdit { ...props } />
			</Fragment>
		);
	};
}, 'withAttributes' );

/**
 * Override props assigned to save component to inject atttributes
 *
 * @param {Object} extraProps Additional props applied to save element.
 * @param {Object} blockType  Block type.
 * @param {Object} attributes Current block attributes.
 *
 * @return {Object} Filtered props applied to save element.
 */
function applyExtraClass( extraProps, blockType, attributes ) {
	const { sidetrack, isHeightFullScreen, isFullWidth } = attributes;

	if ( typeof sidetrack !== 'undefined' && ! restrictedBlocks.includes( blockType.name ) ) {
		if ( typeof sidetrack.id !== 'undefined' ) {
			extraProps.className = classnames( extraProps.className, sidetrack.id );
		}

		if ( typeof sidetrack.desktop !== 'undefined' && ! sidetrack.desktop ) {
			extraProps.className = classnames( extraProps.className, 'sidetrack-no-desktop' );
		}

		if ( typeof sidetrack.tablet !== 'undefined' && ! sidetrack.tablet ) {
			extraProps.className = classnames( extraProps.className, 'sidetrack-no-tablet' );
		}

		if ( typeof sidetrack.mobile !== 'undefined' && ! sidetrack.mobile ) {
			extraProps.className = classnames( extraProps.className, 'sidetrack-no-mobile' );
		}
	}

	if ( hasBlockSupport( blockType.name, 'hasHeightFullScreen' ) && isHeightFullScreen ) {
		extraProps.className = classnames( extraProps.className, 'h-screen' );
	}

	if ( hasBlockSupport( blockType.name, 'hasFullWidthDisplay' ) && isFullWidth ) {
		extraProps.className = classnames( extraProps.className, 'ek-w-full' );
	}

	return extraProps;
}

const addEditorBlockAttributes = createHigherOrderComponent( ( BlockListBlock ) => {
	return ( props ) => {
		const { name, attributes } = props;
		const { isHeightFullScreen, isFullWidth } = attributes;

		let wrapperProps 	= props.wrapperProps;
		let customData 	 	= {};

		if ( hasBlockSupport( name, 'hasHeightFullScreen' ) && isHeightFullScreen ) {
			customData = Object.assign( customData, { 'data-sidetrack-h-screen': 1 } );
		}

		if ( hasBlockSupport( name, 'hasFullWidthDisplay' ) && isFullWidth ) {
			customData = Object.assign( customData, { 'data-sidetrack-w-full': 1 } );
		}

		wrapperProps = {
			...wrapperProps,
			...customData,
		};

		return <BlockListBlock { ...props } wrapperProps={ wrapperProps } />;
	};
}, 'addEditorBlockAttributes' );

addFilter(
	'blocks.registerBlockType',
	'sidetrack/custom/attributes',
	addAttributes
);

addFilter(
	'editor.BlockEdit',
	'sidetrack/attributes',
	withAttributes
);

addFilter(
	'blocks.getSaveContent.extraProps',
	'sidetrack/applyExtraClass',
	applyExtraClass
);

addFilter(
	'editor.BlockListBlock',
	'sidetrack/addEditorBlockAttributes',
	addEditorBlockAttributes
);
