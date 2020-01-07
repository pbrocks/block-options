/**
 * Internal dependencies
 */
import Edit from './components/edit';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Fragment } = wp.element;

/**
 * Block constants
 */
const name = 'sidetrack/abbreviation';

export const abbreviation = {
	name,
	title: __( 'Abbreviation', 'blockshop-options' ),
	tagName: 'abbr',
	className: null,
	attributes: {
		title: 'title',
		lang: 'lang',
	},
	edit: Edit,
};
