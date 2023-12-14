import { React, useEffect, useState } from 'react';
import { getTopics } from '../utils/api';
import { Link } from 'react-router-dom';

const Topics = props => {
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        getTopics().then(({ data }) => {
            setTopics(data.topics);
        });
    }, []);

    return (
        <div>
            {topics.map(topic => {
                return (
                    <div key={topic.slug}>
                        <h2>{topic.slug}</h2>
                        <p>{topic.description}</p>
                        <Link
                            className="link-btn"
                            to={`/topics/${topic.slug}`}
                        >
                            See Articles
                        </Link>
                    </div>
                );
            })}
        </div>
    );
};

export default Topics;
