/**
 * Internal dependencies
 */
import ExportManager from './components/export';

/**
 * WordPress dependencies
 */
const { registerPlugin } = wp.plugins;

registerPlugin( 'sidetrack-features-import-export', {
	icon: false,
	render: ExportManager,
} );
