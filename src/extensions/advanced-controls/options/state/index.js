/**
 * WordPress Dependencies
 */
const { __ } = wp.i18n;
const { dispatch } = wp.data;
const { Fragment } = wp.element;
const { ToggleControl } = wp.components;

const UserStateOptions = ( props ) => {
	const {
		clientId,
		attributes,
		reloadModal,
	} = props;

	const {
		sidetrack,
	} = attributes;

	const onSelectUser = ( state ) => {
		const newValue = ! sidetrack[ state ];

		delete sidetrack[ state ];

		const blockOptions = Object.assign( { [ state ]: newValue }, sidetrack );

		dispatch( 'core/block-editor' ).updateBlockAttributes( clientId, { sidetrack: blockOptions } );

		if ( reloadModal ) {
			reloadModal();
		}
	};

	if ( typeof sidetrack === 'undefined' ) {
		return;
	}

	return (
		<Fragment>
			<div className="sidetrack-user-state-controls">
				<hr className="sidetrack-divider" />
				<ToggleControl
					label={ __( 'Hide on Loggedin Users', 'blockshop-options' ) }
					help={ ! sidetrack.loggedin ? __( 'Hidden when users are logged in.', 'blockshop-options' ) : __( 'Toggle to hide this block when users are not logged in.', 'blockshop-options' ) }
					checked={ typeof sidetrack.loggedin !== 'undefined' && ! sidetrack.loggedin }
					onChange={ () => onSelectUser( 'loggedin' ) }
				/>
				<ToggleControl
					label={ __( 'Hide on Loggedout Users', 'blockshop-options' ) }
					help={ ! sidetrack.loggedout ? __( 'Hidden on guests or logged out users.', 'blockshop-options' ) : __( 'Toggle to hide this block when users are guests or logged out.', 'blockshop-options' ) }
					checked={ typeof sidetrack.loggedout !== 'undefined' && ! sidetrack.loggedout }
					onChange={ () => onSelectUser( 'loggedout' ) }
				/>
			</div>
		</Fragment>
	);
};

export default UserStateOptions;
