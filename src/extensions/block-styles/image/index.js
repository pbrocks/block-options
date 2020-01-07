/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { registerBlockStyle } = wp.blocks;

function registerStyles() {
	[
		'core/image',
		'core/cover',
	].forEach( ( block ) => {
		registerBlockStyle( block, {
			name: 'default',
			label: __( 'Default', 'blockshop-options' ),
			isDefault: true,
		} );

		registerBlockStyle( block, {
			name: 'sidetrack-circular',
			label: __( 'Circular', 'blockshop-options' ),
			isDefault: false,
		} );

		registerBlockStyle( block, {
			name: 'sidetrack-rounded',
			label: __( 'Rounded Corners', 'blockshop-options' ),
			isDefault: false,
		} );

		registerBlockStyle( block, {
			name: 'sidetrack-diagonal',
			label: __( 'Diagonal', 'blockshop-options' ),
			isDefault: false,
		} );

		registerBlockStyle( block, {
			name: 'sidetrack-inverted-diagonal',
			label: __( 'Inverted Diagonal', 'blockshop-options' ),
			isDefault: false,
		} );

		registerBlockStyle( block, {
			name: 'sidetrack-shadow',
			label: __( 'Shadow', 'blockshop-options' ),
			isDefault: false,
		} );
	} );
}
registerStyles();
