import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDetRequest, getListRequest } from './actions/actionCreators';
import { NavLink } from 'react-router-dom'
import Loader from 'react-loader';
import { nanoid } from 'nanoid'

export default function Skills() {
    const { items, loading, error, det } = useSelector(state => state.skills);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getListRequest());
    }, [dispatch])

    const handleDet = id => {
        dispatch(getDetRequest(id));
    };

    if (loading) {
        return <Loader></Loader>;
    }
    if (error) {
        return <p className="error">Произошла ошибка!</p>;
    }
    return (
        <Fragment>
            {<ul>{items.map(o => <NavLink to={`${o.id}/details`}><li key={nanoid()} onClick={() => handleDet(o.id)}>{o.name}</li></NavLink>)}</ul>}
        </Fragment>
    )
}
