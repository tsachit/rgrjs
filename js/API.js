import { post } from "jquery";
import ServerActions from "./actions/ServerActions";

const API = {
    fetchLinks() {
        // Ajax request to read /data/fetchLinks
        post("/graphql", {
            query: `{
                links {
                  _id
                  title
                  url
                }
              }`
        }).done(resp => {
            ServerActions.receiveLinks(resp.data.links);
        });
    }
}

export default API;