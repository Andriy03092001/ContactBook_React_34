import React, { Fragment, Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ContactList from "./Components/ContactList/ContactList";
import uuid from "react-uuid";
import AddContact from './Components/AddContact/AddContact';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Page404 from "./Components/Page404/Page404";
import EditContact from "./Components/EditContact/EditContact";

class App extends Component {

    constructor() {
        super();
        console.log("here ctor");
    }

    //Коли по факту вже відмалювався
    componentDidMount() {
        console.log("componentDidMount");

        const URL = "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5";

        fetch(URL, { method: "GET" }).then(data => {
            this.setState({
                currency: data
            })
        }).catch(error => {
            console.log("Error: ", error);
        })

        const data = [
            {
                id: uuid(),
                name: "Andrii Riabiiiiiii",
                phone: "+38 (095) 41 66 765",
                email: "cuanid236316@gmail.com",
                address: "Rivne Soborna 16",
                gender: "men",
                avatar: 3,
                isFavorite: false
            },
            {
                id: uuid(),
                name: "Oksana Vilkova",
                phone: "+38 (777) 41 11 765",
                email: "oksonoooochka@gmail.com",
                address: "Kiev",
                gender: "women",
                avatar: 3,
                isFavorite: true
            },
            {
                id: uuid(),
                name: "Kate Yaroshik",
                phone: "+38 (777) 11 22 725",
                email: "kateyaroshik@gmail.com",
                address: "Rivne Kornin 16",
                gender: "women",
                avatar: 17,
                isFavorite: true
            },
            {
                id: uuid(),
                name: "Bogdan Lohovsiy",
                phone: "+38 (666) 33 11 725",
                email: "loh111@gmail.com",
                address: "Selo SRAKA",
                gender: "men",
                avatar: 17,
                isFavorite: true
            }
        ];
        this.setState({
            List: data
        });
    }

    //Коли треба щоб не робився перерендер чи ні (Приклад з зіркою)
    shouldComponentUpdate(prevProps, nextState) {
        console.log("prevProps ->", prevProps);
        console.log("nextState ->", nextState);
        // if (nextState.List[0] === true) {
        //     return false;
        // }
        // else {
        //     return true;
        // }
        return true;
    }

    //Коли відбулися зміни 
    componentDidUpdate() {
        console.log("componentDidUpdate");
    }

    //Буде видалення
    componentWillUnmount() {
        console.log("componentWillUnmount");
    }



    state = {
        List: [],
        currentContact: null,
        currency: null
    };

    changeFavorite = id => {
        // console.log("onStarChange ", id);
        const index = this.state.List.findIndex(elem => elem.id === id);
        let tempList = this.state.List.slice();
        tempList[index].isFavorite = !tempList[index].isFavorite;
        this.setState(state => {
            return {
                isFavorite: !this.tempList
            };
        });
    };

    addContact = (name, address, phone, email, avatar) => {
        console.log(`Name: ${name}\n
                     Address: ${address}\n
                     Email: ${email}\n
                     Avatar: ${avatar}\n
                     Phone: ${phone}`);


        const newContact = {
            id: uuid(),
            name: name,
            phone: phone,
            email: email,
            address: address,
            gender: "men",
            avatar: avatar,
            isFavorite: false
        };

        this.setState(state => {
            let tempList = this.state.List.slice();
            tempList.push(newContact);

            return {
                List: tempList
            };
        });

    }

    deleteContact = (id) => {
        const tempList = this.state.List.slice();
        const index = tempList.findIndex(item => item.id === id);
        tempList.splice(index, 1);

        this.setState({
            List: tempList
        })
    }


    editContact = (id) => {
        const index = this.state.List.findIndex(item => item.id === id);
        console.log("id = ", id, " index = ", index);
        const currentContact = this.state.List[index];
        this.setState({
            currentContact: currentContact
        })

    }


    saveEditedContact = (name, address, phone, email, avatar, id) => {
        const editedContact = {
            id: id,
            name: name,
            phone: phone,
            email: email,
            address: address,
            gender: "men",
            avatar: avatar,
            isFavorite: false
        };

        console.log(`Name: ${editedContact.name}\n
        Address: ${editedContact.address}\n
        Email: ${editedContact.email}\n
        Avatar: ${editedContact.avatar}\n
        Phone: ${editedContact.phone}`);

        const tempList = this.state.List;
        for (var i = 0; i < tempList.length; i++) {
            if (tempList[i].id === id) {
                tempList[i] = editedContact;
            }
        }
        this.setState({
            List: tempList
        });


    }

    render() {

        return (
            <Fragment>
                <Router>
                    <div className="container">
                        <header className="hat">
                            <nav className="navbar navbar-default">
                                <div className="container-fluid">
                                    <div className="navbar-header">
                                        <Link className="navbar-brand" to="/">Contact book</Link>
                                    </div>
                                    <ul className="nav navbar-nav">
                                        <li><Link to="/">List contacts</Link></li>
                                        <li><Link to="/addContact">Add contact</Link></li>
                                    </ul>
                                </div>
                            </nav>
                        </header>
                        <main>

                            <Switch>

                                <Route
                                    path="/"
                                    exact
                                    render={() => <ContactList
                                        Data={this.state.List}
                                        changeFavorite={this.changeFavorite.bind(this)}
                                        deleteContact={this.deleteContact}
                                        editContact={this.editContact}
                                    ></ContactList>}
                                ></Route>

                                <Route
                                    path="/addContact"
                                    exact
                                    render={() => <AddContact
                                        addContact={this.addContact}
                                    ></AddContact>}
                                ></Route>

                                <Route
                                    path="/editContact"
                                    exact
                                    render={() => <EditContact
                                        currentContact={this.state.currentContact}
                                        saveEditedContact={this.saveEditedContact}
                                    ></EditContact>}
                                ></Route>


                                <Route
                                    path="*"
                                    render={() => <Page404></Page404>}
                                ></Route>


                            </Switch>


                            {/* <ContactList
                                Data={this.state.List}
                                changeFavorite={this.changeFavorite.bind(this)}
                                deleteContact={this.deleteContact}
                            ></ContactList>

                            <div className="forms">
                                <AddContact addContact={this.addContact}></AddContact>
                            </div> */}


                        </main>
                    </div>
                </Router>
            </Fragment >
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));