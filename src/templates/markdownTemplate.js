import React from "react"
import { graphql } from "gatsby"
import DocLayout from "../components/doclayout"
import Heading from "@react/react-spectrum/Heading"
import { Feedback, Nav } from "@parliament/parliament-ui-components"

const MarkdownTemplate = props => {
  const {
    data: {
      allFile: { edges },
    },
  } = props

  const {
    node: {
      childMarkdownRemark: { html, tableOfContents, timeToRead },
      gitRemote: { protocol, resource, full_name, ref },
      modifiedTime,
      relativePath,
    },
  } = edges.find(({ node: { id } }) => id === props.pageContext.id)

  return (
    <DocLayout>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ width: "25%" }}>
          <Nav data={props.data.rawGatsbySourceGitJson.pages} />
        </div>
        <div
          style={{ width: "50%" }}
          dangerouslySetInnerHTML={{ __html: html }}
        ></div>
        <div style={{ width: "25%" }}>
          <div style={{ paddingBottom: "20px" }}>
            <Feedback
              gitUrl={`${protocol}://${resource}/${full_name}`}
              filePath={relativePath}
              branch={ref}
            />
          </div>
          <div>
            <Heading variant="subtitle3">On this page</Heading>
            <span
              className="toc"
              dangerouslySetInnerHTML={{ __html: tableOfContents }}
            ></span>
          </div>
          <p>
            <span style={{ display: "block" }}>
              Last update: {modifiedTime}
            </span>
            <span style={{ display: "block" }}>{timeToRead} min read</span>
          </p>
        </div>
      </div>
    </DocLayout>
  )
}

export default MarkdownTemplate

export const query = graphql`
  query MarkdownTemplateQuery {
    rawGatsbySourceGitJson {
      title
      pages
    }
    allFile {
      edges {
        node {
          id
          modifiedTime(formatString: "YYYY-MM-DD")
          name
          childMarkdownRemark {
            html
            tableOfContents
            timeToRead
          }
          gitRemote {
            protocol
            resource
            full_name
            ref
          }
          relativePath
        }
      }
    }
  }
`