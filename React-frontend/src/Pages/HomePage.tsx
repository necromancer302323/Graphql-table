
import "../App.css";
import { gql, useQuery } from "@apollo/client";
import { DataTable } from "../components/ui/data-table";
import { columns } from "../components/ui/colums";

function Homepage() {
  const getGames = gql`
    query gettingGames {
      games {
    id
    title
    platform
  }
    }
  `;
  const {data:GameData}= useQuery(getGames)
  console.log(GameData)
  return (
    <div className="dark bg-background text-foreground h-screen">
      
      {
        GameData&&
        <DataTable columns={columns} data={GameData.games} />
      }
    </div>
  );
}

export default Homepage;
