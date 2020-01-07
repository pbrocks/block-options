/**
 * Internal dependencies
 */
import Edit from './components/edit';
import icon from './icon';
import transforms from './transforms';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

/**
 * Block constants
 */
const name = 'import';

const title = __( 'Import', 'blockshop-options' );

const keywords = [
	__( 'import', 'blockshop-options' ),
	__( 'download', 'blockshop-options' ),
	__( 'migrate', 'blockshop-options' ),
];

const blockAttributes = {
	file: {
		type: 'object',
	},
};

const settings = {

	title,

	description: __( 'Import blocks exported using Sidetrack plugin.', 'blockshop-options' ),

	keywords,

	attributes: blockAttributes,

	supports: {
		align: true,
		alignWide: false,
		alignFull: false,
		customClassName: false,
		className: false,
		html: false,
	},

	transforms,

	edit: Edit,

	save() {
		return null;
	},
};

export { name, title, icon, settings };
