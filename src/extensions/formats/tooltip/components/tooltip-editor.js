/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { IconButton } = wp.components;

/**
 * Internal dependencies
 */
import TooltipInput from './url-input';

export default function TooltipEditor( {
	autocompleteRef,
	className,
	onChangeInputValue,
	value,
	...props
} ) {
	return (
		<form
			className={ classnames(
				'block-editor-url-popover__link-editor',
				className
			) }
			{ ...props }
		>
			<TooltipInput
				value={ value }
				onChange={ onChangeInputValue }
				autocompleteRef={ autocompleteRef }
			/>
			<IconButton icon="editor-break" label={ __( 'Apply', 'block-options' ) } type="submit" />
		</form>
	);
}
