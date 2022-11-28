import { makeStyles } from '@material-ui/core/styles';
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

import Avatar from "@material-ui/core/Avatar";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Modal from "@material-ui/core/Modal";
import CreatePost from './create_modal';


const useStyles = makeStyles((theme) => ({
    blogTitle: {
        fontWeight: 800,
        paddingBottom: theme.spacing(3)
    },
    card: {
        maxWidth: "100%",
        height: 500
    },
    media: {
        height: 200
    },
    cardActions: {
        display: "flex",
        margin: "0 10px",
        justifyContent: "space-between"
    },
    author: {
        display: "flex"
    },
    cardContent: {
        height: 200,
        overflow: "hidden"
    }
  }));


function Post({blog_id, user_id, title, description, imageUrl, userData, deletePost, editPost}) {
    const [user] = useAuthState(auth);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const classes = useStyles();

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <CreatePost editPost={editPost} title={title} description={description} blog_id={blog_id}/>
            </Modal>
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                    className={classes.media}
                    image={imageUrl}
                    title="Contemplative Reptile"
                    />
                    <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {description}
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions className={classes.cardActions}>
                    <Box className={classes.author}>
                    <Avatar alt={String(user_id)} src="/static/images/avatar/1.jpg" />
                    </Box>
                    <Box>
                    { user && userData && user_id === userData?.user_id ?
                        <span>
                            <button className="text__button" onClick={handleOpen} >Edit</button>
                            <button className="text__button" onClick={() => { deletePost(blog_id) }}>Delete</button>
                        </span>
                        :
                        <></>
                    }
                    </Box>
                </CardActions>
            </Card>
        </Grid>
    );
}

export default Post;