import { ExploreQuery } from '../explore/Statistics';

export function rankUsers(dataInput: ExploreQuery) {
  const userArray = dataInput.sightings.map((sighting) => {
    return { userId: sighting.userId, username: sighting.userData.username };
  });

  console.log(userArray);

  const userList = [...new Set(userArray.map((user) => user.username))];

  const userCount = userList.map((user) => {
    const count = userArray.filter(
      (userItem) => user === userItem.username,
    ).length;
    return { user, count };
  });

  const userRank = userCount.sort((a, b) => b.count - a.count);

  const rankedUser = userRank.slice(0, 10).map((user) => {
    const matchedUser = userArray.find(
      (userItem) => userItem.username === user.user,
    );

    const username = matchedUser ? matchedUser.username : '';
    const userId = matchedUser ? matchedUser.userId : '';
    return { userId: userId, username: username, sightings: user.count };
  });
  console.log(rankedUser);
  return rankedUser;
}
