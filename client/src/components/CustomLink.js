/**
 * Code taken from:
 * https://blog.usejournal.com/make-different-html-tags-behave-as-a-react-router-link-81b09c9edc6d
 * 
 * We'll use this instead of the react-router-dom Link component, so we can use diferent elements
 * other than <a> tags to link our pages
 */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const CustomLink = ({ history, to, onClick, tag: Tag, ...rest }) => (
    <Tag
        {...rest}
        onClick={(event) => {
            onClick(event);
            history.push(to)
        }}
    />
);

CustomLink.propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    onClick: PropTypes.func
};
CustomLink.defaultProps = {
    onClick: () => {}
};
export default withRouter(CustomLink);