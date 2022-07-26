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

export default function View_main() {
    const IP_Predict = 'http://localhost:8000/text/input';
    const [alert, setAlert] = React.useState(false);
    const [alertContent, setAlertContent] = React.useState('');
    const [inputText, setInputText] = React.useState('');
    const [label, setLabel] = React.useState('Keyword');
    const [articleType, setArticleType] = React.useState('');
    const [summarizedText, setSummarizedText] = React.useState('');

    const handleSummarizedTextChange = (event: SelectChangeEvent) => {
        setSummarizedText(event.target.value);
    }
    const handleInputTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value);
    };
    const handleArticleTypeChange = (event: SelectChangeEvent) => {
        setArticleType(event.target.value);
    };

    const handleSubmit = event => {
        event.preventDefault();
        const payloadText = inputText
            .replace('\"', '')
            .replace('\'', '')
            .replace('\\', "")
            .replace('/', "")
            .replace(/\\n/g, "\\n")
            .replace(/\\'/g, "\\'")
            .replace(/\\"/g, '\\"')
            .replace(/\\&/g, "\\&")
            .replace(/\\r/g, "\\r")
            .replace(/\\t/g, "\\t")
            .replace(/\\b/g, "\\b")
            .replace(/\\f/g, "\\f");
        axios.post(IP_Predict,
            {
                "raw_text": payloadText,
                "article_type": articleType,
            },
            {
            headers: {
            'accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': 'MeSqAaXtGAgI7grNXRN75Vp7XFPgDcam7b1wd8BGFC6NGYdKrfwDkJsKcBTqNeGF'
        }}).then(res => {
                setSummarizedText(res.data.summary);
                setLabel(res.data.labels);
                console.log(label);
            }).catch(function (error) {
            setAlertContent("Invalid input text!");
            setAlert(true);
        });
    }

    const useStyles = makeStyles(theme => ({
        container: {
            display: "flex",
            alignItems: "center",
            padding: 100
        },
        border: {
            borderBottom: "1px dotted gray",
            width: "100%"
        },
        content: {
            fontWeight: 250,
            fontSize: 22,
            color: "gray",
            marginLeft: 10,
            marginRight: 10,
        }
    }));

    const DividerWithText = ({children}) => {
        const classes = useStyles();
        return (
            <div className={classes.container}>
                <div className={classes.border}/>
                <span className={classes.content}>{children}</span>
                <div className={classes.border}/>
            </div>
        );
    };

    const Label = ({labelName}) => {
        return (
            <Grid item xs={6} md={2} color="0xffffff" padding="5pt">
                <Card style={{color: 'white', backgroundColor: '#e91e63'}}>
                    <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                        <TagIcon/>
                        <Typography variant="subtitle1" color="inherit" padding="5pt" align="left">
                            {labelName}
                        </Typography>
                    </div>
                </Card>
            </Grid>
        );
    }

    return (
        <Container maxWidth="xl">
            <div>
                {alert ? <Alert severity='error'>{alertContent}</Alert> : <></> }
            </div>
            <Box sx={{border: '1px dashed grey'}} margin="50pt" padding="20pt">
                <Grid container>
                    <Grid item xs={6} md={8}>
                        <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                            <NewspaperIcon/>
                            <Typography variant="subtitle1" color="inherit" padding="5pt" align="left">
                                Article Type:
                            </Typography>
                            <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={articleType}
                                    onChange={handleArticleTypeChange}
                                    label="Article Type"
                                >
                                    <MenuItem value={"News"}>News</MenuItem>
                                    <MenuItem value={"General Article"}>General Article</MenuItem>
                                    <MenuItem value={"Literary Works"}>Literary Works</MenuItem>
                                    <MenuItem value={"Science Paper"}>Science Paper</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <Typography align='right'>
                            <Button variant="contained" color="primary" size="large" startIcon={<ArticleIcon/>} onClick={handleSubmit}>
                                Summarize
                            </Button>
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} md={12}>
                        <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                            <ArticleIcon/>
                            <Typography variant="subtitle1" color="inherit" padding="5pt" align="left">
                                Input Text:
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <br/>
                        <TextField
                            id="filled-multiline-static"
                            label="Input text here for summarization"
                            multiline
                            rows={10}
                            fullWidth={true}
                            value={inputText}
                            onChange={handleInputTextChange}
                            defaultValue="Default Value"
                            variant="outlined"
                        />
                    </Grid>
                </Grid>
                <DividerWithText>Outputs</DividerWithText>

                <Grid container>
                    <Grid item xs={6} md={2}>
                        <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                            <TagIcon/>
                            <Typography variant="subtitle1" color="inherit" padding="5pt" align="left">
                                Keywords:
                            </Typography>
                        </div>
                    </Grid>
                    {label.split(",").map((labelName, index) => {
                        return <Label labelName={labelName} key={index}/>
                    }
                    )}
                </Grid>

                <Grid container>
                    <Grid item xs={12} md={12}>
                        <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                            <ArticleIcon/>
                            <Typography variant="subtitle1" color="inherit" padding="5pt" align="left">
                                Summarized Text:
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <br/>
                        <TextField
                            id="filled-multiline-static"
                            label="Summarized Text"
                            multiline
                            rows={10}
                            fullWidth={true}
                            value={summarizedText}
                            onChange={handleSummarizedTextChange}
                            defaultValue="Default Value"
                            variant="outlined"
                        />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}
