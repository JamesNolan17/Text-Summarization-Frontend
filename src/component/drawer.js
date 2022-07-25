import React from "react";
import {Drawer, List, ListItem, ListItemText,} from "@material-ui/core";
import {Link} from "react-router-dom";

function DrawerComponent() {
    return(
            <Drawer>
                <List>
                    <ListItem>
                        <ListItemText>
                            <Link to="/">Home</Link>
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>
                            <Link to="/about">About</Link>
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>
                            <Link to="/contact">Contact</Link>
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>
                            <Link to="/about">Faq</Link>
                        </ListItemText>
                    </ListItem>
                </List>
            </Drawer>
            );
            }
export default DrawerComponent;