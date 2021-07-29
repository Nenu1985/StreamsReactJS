import React from 'react';
import {connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {

    // state = { isSignedIn: null }

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            // init is a Promise function
            window.gapi.client.init({
                clientId: '197028056116-ne6ai67tk3q2u9be0jf3v8ogbm08mufl.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                // this.setState({ isSignedIn: this.auth.isSignedIn.get() });
                this.onAuthChange( this.auth.isSignedIn.get() );
                // Subscribing on auth changes in the future !!!
                this.auth.isSignedIn.listen(this.onAuthChange);
            })
        });
    }
    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
        // this.setState({ isSignedIn: this.auth.isSignedIn.get() })
    };

    onSignOutClick = () => {
        this.auth.signOut();
    }

    onSignInClick = () => {
        this.auth.signIn();
    }
    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return <div> I don't know if we are signed in </div>
        } else if (this.props.isSignedIn) {
            return (
                <button
                    className="ui red google button"
                    onClick={this.onSignOutClick}
                >
                    <i className="google icon" />
                    Sign out
                </button>
            )
        } else {
            return (
                <button
                    className="ui red google button"
                    onClick={this.onSignInClick}
                >
                    <i className="google icon" />
                    Sign in
                </button>
            )
        }

    }
    render() {
        return (
            <div>{this.renderAuthButton()}</div>
        )
    }
}
const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
}

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);