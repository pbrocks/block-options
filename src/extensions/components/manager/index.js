/**
 * Internal dependencies
 */
import FeaturesManagerModal from './components/';

/**
 * WordPress dependencies
 */
const { registerPlugin } = wp.plugins;

registerPlugin( 'sidetrack-features-manager', {
	icon: false,
	render: FeaturesManagerModal,
} );
