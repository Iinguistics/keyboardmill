import React from 'react';
import { Helmet } from 'react-helmet';


const Meta = ({ title, description, keywords })=>{


    return (
        <Helmet>
        <title>{title}</title>
        <meta name="description" content={description}  />
        <meta name="description" content={keywords} />
    </Helmet>
    )
}


Meta.defaultProps = {
    title: "Keyboardmill | Online shopping for keyboards, electronics...",
    description: "Shop for the best tech around",
    keywords: "keyboards, buy electronics, tech"
}


export default Meta