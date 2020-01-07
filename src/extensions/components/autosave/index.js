/**
 * Internal dependencies
 */
import ManageAutoSave from './components/menu';

/**
 * WordPress dependencies
 */
const { registerPlugin } = wp.plugins;

registerPlugin( 'sidetrack-editor-autosave', {
	icon: false,
	render: ManageAutoSave,
} );
