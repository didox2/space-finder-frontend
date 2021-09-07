import React from "react";
import { SyntheticEvent } from "react";
import { User } from "../model/Model";
import { AuthService } from "../services/AuthService";
import history from '../util/history'

interface LoginProps {
    authService: AuthService,
    setUser: (user: User) => void
}
interface LoginState {
    userName: string,
    password: string,
    loginAttenpted: boolean,
    loginSuccessful: boolean
}

interface customEvent {
    target: HTMLInputElement
}

export class Login extends React.Component<LoginProps, LoginState> {

    state: LoginState = {
        userName: '',
        password: '',
        loginAttenpted: false,
        loginSuccessful: false
    }

    private setUserName(event: customEvent) {
        this.setState({ userName: event.target.value })
    }

    private setPassword(event: customEvent) {
        this.setState({ password: event.target.value })
    }

    private async handleSubmit(event: SyntheticEvent) {
        event.preventDefault();
        this.setState({ loginAttenpted: true })
        const result = await this.props.authService.login(
            this.state.userName,
            this.state.password
        )
        if (result) {
            this.setState({ loginSuccessful: true })
            this.props.setUser(result)
            history.push('/profile')
        } else {
            this.setState({ loginSuccessful: false })

        }
    }

    render() {

        let loginMessage: any

        if (this.state.loginAttenpted) {
            if (this.state.loginSuccessful)
                loginMessage = <label>Login successful</label>
            else {
                loginMessage = <label>Login failed</label>
            }
        }

        return (
            <div>
                <h2>Please login</h2>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <input value={this.state.userName} onChange={e => this.setUserName(e)} /><br />
                    <input value={this.state.password} type='password' onChange={e => this.setPassword(e)} /><br />
                    <input type='submit' value='Login' />
                </form>
                <div>{loginMessage}</div>
            </div>
        )
    }
}