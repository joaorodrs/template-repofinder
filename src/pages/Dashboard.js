import React, { useState, useEffect } from 'react';
// import { useAuth } from 'contexts/auth';
import { toast } from 'react-toastify';
import clsx from 'clsx';
import {
  makeStyles,
  colors,
  CardContent,
  Card,
  CardHeader,
  IconButton,
  Avatar,
  Typography,
  Collapse,
  CardActions,
} from '@material-ui/core';
import { ExpandMore, MoreVert, OpenInNew } from '@material-ui/icons';
import Centered from 'components/Centered';
import api from '../services/api';
import { getFormattedDate } from '../utils/transform';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: colors.red[500],
  },
}));

function Dashboard() {
  // const { user } = useAuth();
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [repo, setRepo] = useState({
    name: 'something',
    owner: {
      avatar_url: 'something',
      login: 'joaopaulo',
    },
    created_at: 'legal',
  });
  const [formattedDate, setFormattedDate] = useState('');

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  async function loadMainRepos() {
    try {
      const response = await api.get('repos/joaorodrs/reactchat');

      setRepo(response.data);

      const date = new Date(response.data.created_at);

      const formattedDate = getFormattedDate(date.toISOString());

      setFormattedDate(formattedDate);
    } catch (err) {
      toast.error(`Não foi possível carregar o repositório.`);
    }
  }

  useEffect(() => {
    loadMainRepos();
  });

  return (
    <Centered>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="João Paulo"
              className={classes.avatar}
              src={repo.owner.avatar_url}
              alt={repo.owner.login}
            />
          }
          action={
            <IconButton aria-label="settings">
              <MoreVert />
            </IconButton>
          }
          title={repo.name}
          subheader={formattedDate}
        />
        <CardContent>
          <Typography variant="body2" color="primary" component="p">
            {repo.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            aria-label="Abrir"
            onClick={() => window.open(repo.html_url, '_blank')}
          >
            <OpenInNew />
          </IconButton>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="Mostrar mais"
          >
            <ExpandMore />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Foi criado em {formattedDate}</Typography>
            <Typography paragraph>
              A branch principal é <b>{repo.default_branch}</b>
            </Typography>
            <Typography paragraph>
              Possui <b>{repo.stargazers_count}</b> stars
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Centered>
  );
}

export default Dashboard;
