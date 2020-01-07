/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { registerBlockStyle } = wp.blocks;

registerBlockStyle( 'core/list', {
	name: 'default',
	label: __( 'Default', 'blockshop-options' ),
	isDefault: true,
} );

registerBlockStyle( 'core/list', {
	name: 'none',
	label: __( 'None', 'blockshop-options' ),
	isDefault: true,
} );

registerBlockStyle( 'core/list', {
	name: 'arrow',
	label: __( 'Arrow', 'blockshop-options' ),
	isDefault: false,
} );

registerBlockStyle( 'core/list', {
	name: 'checked',
	label: __( 'Checked', 'blockshop-options' ),
	isDefault: false,
} );

registerBlockStyle( 'core/list', {
	name: 'crossed',
	label: __( 'Crossed', 'blockshop-options' ),
	isDefault: false,
} );

registerBlockStyle( 'core/list', {
	name: 'connected',
	label: __( 'Connected', 'blockshop-options' ),
	isDefault: false,
} );

registerBlockStyle( 'core/list', {
	name: 'starred',
	label: __( 'Starred', 'blockshop-options' ),
	isDefault: false,
} );
