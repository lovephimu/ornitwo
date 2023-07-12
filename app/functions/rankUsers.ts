import { SightingUsernameArray } from '../charts/topTenUsers';

export function rankUsers(dataInput: SightingUsernameArray) {
  const userArray = dataInput.sightingsJointUsers.map((sighting) => {
    return { userId: sighting.userId, username: sighting.username };
  });

  const userList = [...new Set(userArray.map((user) => user.username))];

  const userCount = userList.map((user) => {
    const count = userArray.filter(
      (userItem) => user === userItem.username,
    ).length;
    return { user, count };
  });

  const userRank = userCount.sort((a, b) => b.count - a.count);

  const rankedUser = userRank.slice(0, 5).map((user) => {
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
