import React, { useState, useEffect } from 'react';
import Link from '../Link';
import { makeStyles } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { AppBar } from '@material-ui/core';
import { Toolbar } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { SwipeableDrawer } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Hidden from '@material-ui/core/Hidden';


const logo = '/assets/logo.svg';

// @desc it comes as helper function from Material-UI AppBar section
function ElevationScroll(props) {
    const { children } = props;

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

const useStyle = makeStyles(theme => ({
    toolBarMargin: {
        ...theme.mixins.toolbar,
        marginBottom: '3em',
        [theme.breakpoints.down('md')]: {
            marginBottom: '2em',
        },
        [theme.breakpoints.down('xs')]: {
            marginBottom: '1.25em',
        },
    },
    logo: {
        height: '8em',
        textTransform: 'none',
        [theme.breakpoints.down('md')]: {
            height: '7em',
        },
        [theme.breakpoints.down('xs')]: {
            height: '5.5em',
        },
    },
    logoContainer: {
        padding: 0,
        "&:hover": {
            backgroundColor: 'transparent',
        },
    },
    tabContainer: {
        marginLeft: 'auto',
    },
    tab: {
        ...theme.typography.tab,
        minWidth: 10,
        marginLeft: '25px',
    },
    button: {
        ...theme.typography.estimate,
        borderRadius: '50px',
        marginLeft: '50px',
        marginRight: '25px',
        height: '55px',
        '&:hover': {
            backgroundColor: theme.palette.secondary.light,
        },
    },
    menu: {
        backgroundColor: theme.palette.common.blue,
        color: 'white',
        borderRadius: '0px',
    },
    menuItem: {
        ...theme.typography.tab,
        opacity: 0.7,
        "&:hover": {
            opacity: 1,
        },
    },
    drawerContainer: {
        marginLeft: 'auto',
        "&:hover": {
            backgroundColor: 'transparent',
        },
    },
    drawerIcon: {
        height: '50px',
        width: '50px',
    },
    drawer: {
        backgroundColor: theme.palette.common.blue,
    },
    drawerItem: {
        ...theme.typography.tab,
        color: 'white',
        opacity: 0.7,
    },
    drawerItemSelected: {
        '& .MuiListItemText-root': {
            opacity: 1,
        },
    },
    drawerItemEstimate: {
        backgroundColor: theme.palette.common.orange,
    },
    appBar: {
        zIndex: theme.zIndex.modal + 1,
    },
}));

const Header = ({ value, setValue, selectedIndex, setSelectedIndex }) => {

    const classes = useStyle();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

    const [anchorEl, setAnchorEl] = useState(null);
    const [openMenu, setOpenMenu] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);

    const handleChange = (e, newValue) => {
        setValue(newValue);
    };

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
        setOpenMenu(true);
    };

    const handleMenuItemClick = (e, i) => {
        setAnchorEl(null);
        setOpenMenu(false);
        setSelectedIndex(i);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setOpenMenu(false);
    };

    const menuOptions = [
        { name: 'Services', link: '/services', activeIndex: 1, selectedIndex: 0 },
        { name: 'Custom Software Development', link: '/customsoftware', activeIndex: 1, selectedIndex: 1 },
        { name: 'iOS/Android App Development', link: '/mobileapps', activeIndex: 1, selectedIndex: 2 },
        { name: 'Website Development', link: '/websites', activeIndex: 1, selectedIndex: 3 },
    ];

    const routes = [
        { name: 'Home', link: '/', activeIndex: 0 },
        {
            name: 'Services',
            link: 'services',
            activeIndex: 1,
            ariaOwns: anchorEl ? "simple-menu" : undefined,
            ariaPopup: anchorEl ? "true" : undefined,
            mouseOver: e => handleClick(e),
        },
        { name: 'Revolution', link: '/revolution', activeIndex: 2 },
        { name: 'About', link: '/about', activeIndex: 3 },
        { name: 'Contact', link: '/contact', activeIndex: 4 },
        // { name: 'Free Estimate', link: '/estimate', activeIndex: 5 },
    ];

    useEffect(() => {

        [...menuOptions, ...routes].forEach(route => {
            switch (window.location.pathname) {
                case `${ route.link }`:
                    if (value !== route.activeIndex) {
                        setValue(route.activeIndex);
                        if (route.selectedIndex && route.selectedIndex !== selectedIndex) {
                            setSelectedIndex(route.selectedIndex);
                        }
                    }
                    break;
                case '/estimate':
                    if (value !== 5) {
                        setValue(5);
                    }
                    break;
                default:
                    break;
            }
        });

    }, [value, selectedIndex, menuOptions, routes]);


    const tabs = (
        <>
            <Tabs
                value={ value }
                onChange={ handleChange }
                className={ classes.tabContainer }
                indicatorColor="primary"
            >
                {
                    routes.map((route, index) => (
                        <Tab
                            key={ `${ route }${ index }` }
                            label={ route.name }
                            className={ classes.tab }
                            component={ Link }
                            href={ route.link }
                            aria-owns={ route.ariaOwns }
                            aria-haspopup={ route.ariaPopup }
                            onMouseOver={ route.mouseOver }
                        />
                    ))

                }
            </Tabs>
            <Button variant="contained"
                    color="secondary"
                    className={ classes.button }
                    component={ Link }
                    href="/estimate"
                    onClick={ () => setValue(5) }
            >
                Free Estimate
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={ anchorEl }
                open={ openMenu }
                onClose={ handleClose }
                classes={ { paper: classes.menu } }
                MenuListProps={ { onMouseLeave: handleClose } }
                elevation={ 0 }
                keepMounted
                style={ { zIndex: 1302 } }
            >
                {
                    menuOptions.map((option, index) => (
                            <MenuItem
                                key={ `${ option }${ index }` }
                                component={ Link }
                                href={ option.link }
                                classes={ { root: classes.menuItem } }
                                onClick={ (e) => {
                                    handleMenuItemClick(e, index);
                                    setValue(1);
                                    handleClose();
                                } }
                                selected={ index === selectedIndex && value === 1 }
                            >
                                { option.name }
                            </MenuItem>
                        ),
                    )
                }
            </Menu>
        </>
    );

    const drawer = (
        <>
            <SwipeableDrawer
                disableBackdropTransition={ !iOS }
                disableDiscovery={ iOS }
                open={ openDrawer }
                onClose={ () => setOpenDrawer(false) }
                onOpen={ () => setOpenDrawer(true) }
                classes={ { paper: classes.drawer } }
            >

                <div className={ classes.toolBarMargin } />

                <List disablePadding>

                    {
                        routes.map((route, index) => (
                            <ListItem
                                key={ `${ route }${ index }` }
                                onClick={ () => {
                                    setOpenDrawer(false);
                                    setValue(route.activeIndex);
                                } }
                                selected={ value === route.activeIndex }
                                divider
                                button
                                component={ Link }
                                href={ route.link }
                                classes={ { selected: classes.drawerItemSelected } }
                            >
                                <ListItemText
                                    disableTypography
                                    className={ classes.drawerItem }
                                >
                                    { route.name }
                                </ListItemText>
                            </ListItem>
                        ))
                    }

                    <ListItem
                        onClick={ () => {
                            setOpenDrawer(false);
                            setValue(5);
                        } }
                        selected={ value === 5 }
                        divider
                        button
                        component={ Link }
                        href="/estimate"
                        classes={ { root: classes.drawerItemEstimate, selected: classes.drawerItemSelected } }
                    >
                        <ListItemText
                            className={ classes.drawerItem }
                            disableTypography
                        >
                            Free Estimate
                        </ListItemText>
                    </ListItem>
                </List>
            </SwipeableDrawer>
            <IconButton
                onClick={ () => setOpenDrawer(!openDrawer) }
                disableRipple
                className={ classes.drawerContainer }
            >
                <MenuIcon
                    className={ classes.drawerIcon }
                />
            </IconButton>
        </>
    );

    return (
        <>
            <ElevationScroll>
                <AppBar position="fixed"
                        className={ classes.appBar }
                >
                    <Toolbar disableGutters>
                        <Button
                            component={ Link }
                            href="/"
                            onClick={ () => setValue(0) }
                            disableRipple
                            className={ classes.logoContainer }
                            style={ { textDecoration: 'none' } }
                        >
                            <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 139"
                                 className={ classes.logo }
                            >
                                <style>
                                    { `.st0{ fill:none }.st1{ fill:#fff }.st2{ font-family:Raleway; font-weight:
                                    300; }.st6{ fill:none;stroke:#000;stroke-width:3;stroke-miterlimit:10 }` }
                                </style>
                                <path d="M448.07-1l-9.62 17.24-8.36 14.96L369.93 139H-1V-1z" />
                                <path className="st0" d="M-1 139h479.92v.01H-1z" />
                                <text transform="translate(261.994 65.233)" className="st1 st2" fontSize="57">D</text>
                                <text transform="translate(17.692 112.015)" className="st1 st2" fontSize="54"
                                >Development
                                </text>
                                <path className="st0"
                                      d="M382.44 116.43l47.65-85.23 8.36-14.96M369.83 139l-.01.01L362 153"
                                />
                                <path
                                    d="M438.76 15.76l-56.42 100.91c-12.52-10.83-20.45-26.82-20.45-44.67 0-32.58 26.42-59 59-59 6.23 0 12.24.97 17.87 2.76z"
                                    fill="#0b72b9"
                                />
                                <path
                                    d="M479.89 72c0 32.58-26.42 59-59 59-14.73 0-28.21-5.4-38.55-14.33l56.42-100.91c23.85 7.57 41.13 29.89 41.13 56.24z"
                                />
                                <g id="Group_186" transform="translate(30.153 11.413)">
                                    <g id="Group_185">
                                        <g id="Words">
                                            <path id="Path_59" className="st1"
                                                  d="M405.05 14.4l-.09 80.38-7.67-.01.06-52.25-29.4 52.21-7.94-.01 45.04-80.32z"
                                            />
                                        </g>
                                    </g>
                                </g>
                                <path className="st0"
                                      d="M457-17l-8.93 16-9.62 17.24-8.36 14.96L369.93 139l-.01.01L361 155"
                                />
                            </svg>

                        </Button>

                        <Hidden mdDown>
                            { tabs }
                        </Hidden>
                        <Hidden lgUp>
                            { drawer }
                        </Hidden>

                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <div className={ classes.toolBarMargin } />
        </>
    );
};


export default Header;