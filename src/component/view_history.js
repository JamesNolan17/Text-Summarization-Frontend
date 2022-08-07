import * as React from 'react';
import Typography from '@mui/material/Typography';
import {Alert, Card, Container, FormControl, Grid, MenuItem, Modal, TextField} from "@mui/material";
import {makeStyles} from "@mui/styles";
import Box from "@mui/material/Box";
import ArticleIcon from '@mui/icons-material/Article';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import Button from "@mui/material/Button";
import TagIcon from '@mui/icons-material/Tag';
import axios from "axios";

export default function View_history() {
    const IP_History = 'http://localhost:8000/text/get';
    const IP_Delete = 'http://localhost:8000/text/delete/';



}

