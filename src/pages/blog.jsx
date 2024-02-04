import React from 'react';

import { Link, graphql, useStaticQuery } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

import * as blogpostStyles from '../styles/modules/blog.module.scss';

// TODO: images naar GatsbyImage verwerken

// CONTENTFUL blogposts genereren
const BlogPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulBlogPost(sort: { publishedDate: DESC }) {
        edges {
          node {
            id
            title
            slug
            subtitle
            author
            image {
              title
              file {
                url
              }
            }
            publishedDate(formatString: "dddd D MMMM YYYY", locale: "nl")
          }
        }
      }
    }
  `);

  return (
    <Layout>
      <h1 className="page-title">
        Blog<span>.</span>
      </h1>

      <p className="page-sub">What goes through our mind..</p>

      <section>
        <ul className={blogpostStyles.blogposts}>
          {data.allContentfulBlogPost.edges.map((edge) => (
            <li key={edge.node.id}>
              <Link to={`/blog/${edge.node.slug}/`}>
                <div>
                  <h4>{edge.node.title}</h4>
                  <p>{edge.node.subtitle}</p>
                  <span>
                    Gepost: <strong>{edge.node.publishedDate}</strong> ⌁ Auteur:{' '}
                    <strong>{edge.node.author}</strong>
                  </span>
                </div>

                {/* TODO: image naar GatsbyImage */}

                <img
                  src={edge.node.image.file.url}
                  alt={edge.node.image.title}
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
};

export default BlogPage;

export const Head = () => (
  <SEO
    title="Blog"
    description="What goes through our mind... Our views on life, technology, culture, the past, the future and more..."
    keywords="blog, posts, views, nieuws, stories, nieuws, content, verhalen, news, mind, actualiteiten, actueel"
    pathname="/blog/"
  />
);
