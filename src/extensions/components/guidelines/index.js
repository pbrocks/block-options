/**
 * Internal dependencies
 */
import BlockGuideLines from './components/menu';

/**
 * WordPress dependencies
 */
const { registerPlugin } = wp.plugins;

registerPlugin( 'sidetrack-block-guidelines', {
	icon: false,
	render: BlockGuideLines,
} );
