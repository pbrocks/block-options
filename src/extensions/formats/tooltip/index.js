/**
 * Internal dependencies
 */
import Edit from './components/edit';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { applyFormat, isCollapsed } = wp.richText;
const { decodeEntities } = wp.htmlEntities;
const { isURL } = wp.url;

/**
 * Block constants
 */
const name = 'editorskit/tooltip';

export const tooltip = {
	name,
	title: __( 'tooltip', 'block-options' ),
	tagName: 'ttp',
	className: 'ek-link',
	attributes: {
		url: 'href',
		target: 'target',
		rel: 'rel',
	},
	__unstablePasteRule( value, { html, plainText } ) {
		if ( isCollapsed( value ) ) {
			return value;
		}

		const pastedText = ( html || plainText ).replace( /<[^>]+>/g, '' ).trim();

		// A URL was pasted, turn the selection into a link
		if ( ! isURL( pastedText ) ) {
			return value;
		}

		// Allows us to ask for this information when we get a report.
		window.console.log( 'Created tooltip:\n\n', pastedText );

		return applyFormat( value, {
			type: name,
			attributes: {
				url: decodeEntities( pastedText ),
			},
		} );
	},
	edit: Edit,
};
