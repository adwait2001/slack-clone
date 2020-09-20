import { auth, createOrGetUserProfileDocument } from '../firebase';
import React, { Component, createContext } from 'react';

const intitialState = { user: null, loading: false }
export const userContext = createContext(intitialState)

class UserProvider extends Component {
    state = intitialState;

    async componentDidMount() {
        auth.onAuthStateChanged(async(userAuth) => {
            console.log('UserProvider=>componentDidMount=>userAuth')

            if (userAuth) {
                const userRef =await createOrGetUserProfileDocument(userAuth);
                userRef.onSnapshot((snapshot) => {
                    this.setState({
                        user: {
                            uid:snapshot.id,
                            ...snapshot.data()
                        },
                        loading:false
                    })
                })
            }

        });
    }

    render() {
        console.log(this.state.user)
        return (
            <userContext.Provider value={this.state}>
                {this.props.children}
            </userContext.Provider>
        );
    }
}

export default UserProvider;
