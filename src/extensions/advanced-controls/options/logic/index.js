/**
 * WordPress Dependencies
 */
const { __ } = wp.i18n;
const { dispatch } = wp.data;
const { Fragment } = wp.element;
const { TextareaControl } = wp.components;

const LogicOptions = ( props ) => {
	const {
		clientId,
		attributes,
		reloadModal,
	} = props;

	const {
		sidetrack,
	} = attributes;

	return (
		<Fragment>
			<div className="sidetrack-button-group-container sidetrack-button-group-logic">
				<TextareaControl
					rows="2"
					label={ __( 'Conditional Logic', 'blockshop-options' ) }
					help={ __( 'Add valid PHP conditional tags for custom & advanced visibility options.', 'blockshop-options' ) }
					value={ sidetrack.logic ? sidetrack.logic : null }
					onChange={ ( newValue ) => {
						delete sidetrack.logic;

						const blockOptions = Object.assign( { logic: newValue }, sidetrack );

						dispatch( 'core/block-editor' ).updateBlockAttributes( clientId, { sidetrack: blockOptions } );

						if ( reloadModal ) {
							reloadModal();
						}
					} }
				/>
			</div>
		</Fragment>
	);
};

export default LogicOptions;
