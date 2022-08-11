import React from 'react';
import moment from 'moment';
import localization from 'moment/locale/es';

import { Location, WebSite, Calendar } from '../../../helpers/icons';

import './InfoUser.scss';

const InfoUser = ({user}) => {
    return (
        <div className='info-user'>
            <h2 className='name'>
                { user ? user.name : '' }  { user ? user.last_name : '' }
            </h2>
            <p className='email'>{ user ? user.email : '' }</p>
            { user?.biography && (
                <div className='description'>{ user.biography }</div>
            )}
            <div className='more-info'>
                { user?.city && (
                    <p>
                        <Location style={{ 'marginRight': '6px' }} /> 
                        { user.city }
                    </p>
                )}

                { user?.web_site && (
                    <>
                       <WebSite style={{ 'marginRight': '6px' }} />
                       <a href={user?.web_site} target="_blank" rel="noopener noreferrer">{user?.web_site}</a>
                    </>
                )}

                { user?.birth_date && user?.birth_date !== "0001-01-01T00:00:00Z" && (
                    <p>
                       <Calendar style={{ 'marginRight': '6px' }} />
                       { moment(user?.birth_date)
                            .locale("es", localization)
                            .format('LL')
                        }
                    </p>
                )}
                
            </div>
        </div>
    );
}


export default InfoUser;
