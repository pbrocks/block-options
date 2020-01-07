/**
 * Internal dependencies
 */
import EditorMinHeight from './components/height';

/**
 * WordPress dependencies
 */
const { registerPlugin } = wp.plugins;

registerPlugin( 'sidetrack-editor-height', {
	icon: false,
	render: EditorMinHeight,
} );
