/**
 * Internal dependencies
 */
import ClearFormatting from './controls';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Fragment } = wp.element;

/**
 * Block constants
 */
const name = 'sidetrack/clear-formatting';

export const clear = {
	name,
	title: __( 'Clear Formatting', 'blockshop-options' ),
	tagName: 'span',
	className: 'sidetrack-clear-formatting',
	edit( { isActive, value, onChange, activeAttributes } ) {
		return (
			<Fragment>
				<ClearFormatting name={ name } isActive={ isActive } value={ value } onChange={ onChange } activeAttributes={ activeAttributes } />
			</Fragment>
		);
	},
};
