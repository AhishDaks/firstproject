import axios from "axios";
async function fetchDat() {
  const res = await axios.get(
    `https://free-ap-south-1.cosmocloud.io/development/api/userdetails?limit=100&offset=0`,
    {
      headers: {
        environmentId: "670e99ff59c9b368f802bb25",
        projectid: "670e99ff59c9b368f802bb24",
      },
    },
  );
  return res.data.data;
}

export { fetchDat };
