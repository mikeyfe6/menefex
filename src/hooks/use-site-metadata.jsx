import { graphql, useStaticQuery } from "gatsby";

const useSiteMetadata = () => {
    const data = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    siteUrl
                    title
                    company

                    telephone
                    email

                    author
                    authorImage
                    authorEmail

                    handle

                    image
                    favicon

                    screens
                }
            }
        }
    `);
    return data.site.siteMetadata;
};

export default useSiteMetadata;
