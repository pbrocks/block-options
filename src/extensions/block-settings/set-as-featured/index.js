/**
 * Internal dependencies
 */
import SetAsFeaturedImage from './components/controls';

/**
 * WordPress dependencies
 */
const { registerPlugin } = wp.plugins;

registerPlugin( 'sidetrack-set-as-featured-image', {
	icon: 'format-image',
	render: SetAsFeaturedImage,
} );
