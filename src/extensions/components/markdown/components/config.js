/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const markdownShortcuts = {
	title: __( 'Markdown Formatting', 'blockshop-options' ),
	shortcuts: [
		{
			keyCombination: [ '##', 'SPACE' ],
			description: __( 'Large header (h2)', 'blockshop-options' ),
		},
		{
			keyCombination: [ '###', 'SPACE' ],
			description: __( 'Medium header (h3)', 'blockshop-options' ),
		},
		{
			keyCombination: [ '####', 'SPACE' ],
			description: __( 'Small header (h4)', 'blockshop-options' ),
		},
		{
			keyCombination: [ '1.', 'SPACE' ],
			description: __( 'Numbered list', 'blockshop-options' ),
		},
		{
			keyCombination: [ '*', 'SPACE' ],
			description: __( 'Bulleted list', 'blockshop-options' ),
		},
		{
			keyCombination: [ '>', 'SPACE' ],
			description: __( 'Blockquote', 'blockshop-options' ),
		},
		{
			keyCombination: [ '_italic_' ],
			description: __( 'Italic', 'blockshop-options' ),
		},
		{
			keyCombination: [ '*bold*' ],
			description: __( 'Bold', 'blockshop-options' ),
		},
		{
			keyCombination: [ '~Strikethrough~' ],
			description: __( 'Strikethrough', 'blockshop-options' ),
		},
		{
			keyCombination: [ '`code`' ],
			description: __( 'Code', 'blockshop-options' ),
		},
	],
};

export default [
	markdownShortcuts,
];
