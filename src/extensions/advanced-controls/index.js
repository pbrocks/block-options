/**
 * Internal dependencies
 */
import './custom-class-name';
import DevicesOptions from './options/devices/';
import UserStateOptions from './options/state/';
import VerticalHeightToggle from './options/height/';
import FullWidthToggle from './fullwidth';

/**
 * WordPress Dependencies
 */
const { __ } = wp.i18n;
const { addFilter } = wp.hooks;
const { Fragment }	= wp.element;
const { withSelect, select } = wp.data;
const { InspectorAdvancedControls, InspectorControls }	= wp.blockEditor;
const { compose, createHigherOrderComponent } = wp.compose;
const { PanelBody } = wp.components;
const { hasBlockSupport } = wp.blocks;

const restrictedBlocks = [ 'core/block', 'core/freeform', 'core/shortcode', 'core/template', 'core/nextpage', 'sidetrack/import' ];

const enhance = compose(
	withSelect( () => {
		return {
			isDisabledButtonWidth: select( 'core/edit-post' ).isFeatureActive( 'disableSidetrackButtonFullwidthOptions' ),
			isDisabledDevices: select( 'core/edit-post' ).isFeatureActive( 'disableSidetrackDevicesVisibility' ),
			isDisabledUserState: select( 'core/edit-post' ).isFeatureActive( 'disableSidetrackUserStateVisibility' ),
		};
	} )
);

/**
 * Add custom CoBlocks attributes to selected blocks
 *
 * @param {Function} BlockEdit Original component.
 * @return {string} Wrapped component.
 */
const withAdvancedControls = createHigherOrderComponent( ( BlockEdit ) => {
	return enhance( ( { ...props } ) => {
		const {
			name,
			attributes,
			setAttributes,
			isSelected,
			isDisabledDevices,
			isDisabledUserState,
			isDisabledButtonWidth,
		} = props;

		const {
			sidetrack,
			blockOpts,
		} = attributes;

		const withFullScreenHeight = hasBlockSupport( name, 'hasHeightFullScreen' );
		const withFullWidthDisplay = hasBlockSupport( name, 'hasFullWidthDisplay' );

		//compatibility with version 1
		if ( typeof sidetrack !== 'undefined' && ! sidetrack.migrated && blockOpts ) {
			props.attributes.sidetrack = Object.assign( props.attributes.sidetrack, {
				devices: false,
				desktop: ( ( blockOpts.devices === 'show' && blockOpts.desktop !== 'on' ) || ( blockOpts.devices === 'hide' && blockOpts.desktop === 'on' ) ) ? false : true,
				tablet: ( ( blockOpts.devices === 'show' && blockOpts.tablet !== 'on' ) || ( blockOpts.devices === 'hide' && blockOpts.tablet === 'on' ) ) ? false : true,
				mobile: ( ( blockOpts.devices === 'show' && blockOpts.mobile !== 'on' ) || ( blockOpts.devices === 'hide' && blockOpts.mobile === 'on' ) ) ? false : true,
				loggedin: ( blockOpts.state === 'out' && blockOpts.state !== 'in' ) ? false : true,
				loggedout: ( blockOpts.state === 'in' && blockOpts.state !== 'out' ) ? false : true,
				acf_visibility: ( blockOpts.acf_visibility ) ? blockOpts.acf_visibility : '',
				acf_field: ( blockOpts.acf_field ) ? blockOpts.acf_field : '',
				acf_condition: ( blockOpts.acf_condition ) ? blockOpts.acf_condition : '',
				acf_value: ( blockOpts.acf_value ) ? blockOpts.acf_value : '',
				logic: ( blockOpts.logic ) ? blockOpts.logic : '',
				migrated: true,
			} );

			//remove unnecessary classes
			if ( ! props.attributes.className ) {
				props.attributes.className = '';
			}
			let newClassNames = props.attributes.className.replace( 'b' + blockOpts.id, '' ).replace( 'wpblockshop-show', '' ).replace( 'wpblockshop-hide', '' ).replace( 'wpblockshop-desktop', '' ).replace( 'wpblockshop-tablet', '' ).replace( 'wpblockshop-mobile', '' );
			newClassNames = newClassNames.trim();
			props.attributes.className = newClassNames;

			setAttributes( { sidetrack: props.attributes.sidetrack, className: newClassNames } );
		}

		return (
			<Fragment>
				<BlockEdit { ...props } />
				{
					withFullScreenHeight &&
					<InspectorAdvancedControls>
						{ VerticalHeightToggle( props ) }
					</InspectorAdvancedControls>
				}
				{
					! isDisabledButtonWidth && withFullWidthDisplay &&
					<InspectorAdvancedControls>
						{ FullWidthToggle( props ) }
					</InspectorAdvancedControls>
				}
				{ isSelected && ! isDisabledDevices && ! restrictedBlocks.includes( name ) &&
					<InspectorControls>
						<PanelBody
							title={ __( 'Responsive', 'blockshop-options' ) }
							initialOpen={ false }
							className="sidetrack-panel"
						>
							<small>{ __( 'Attention: The display settings (show/hide for mobile, tablet or desktop) will only take effect once you are on the live page, and not while you\'re editing in Gutenberg.', 'blockshop-options' ) }</small>
							{ DevicesOptions( props ) }
						</PanelBody>
					</InspectorControls>
				}
				{ isSelected && ! restrictedBlocks.includes( name ) &&
					<InspectorAdvancedControls>
						{ ! isDisabledUserState && UserStateOptions( props ) }
					</InspectorAdvancedControls>
				}
			</Fragment>
		);
	} );
}, 'withAdvancedControls' );

addFilter(
	'editor.BlockEdit',
	'sidetrack/advanced',
	withAdvancedControls
);
