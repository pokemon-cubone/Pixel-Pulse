//SPDX-License-Identifier:MIT

pragma solidity ^0.8.0;

contract OneBeat {
    address[] public users;
    mapping(address => bool) isAdded;

    struct Stream {
        uint256 stream_id;
        address stream_creator;
        string title;
        string description;
        string stream_rights;
        string img_cid;
        string video_id;
        bool wantToRecord;
    }
    mapping(uint256 => Stream) public idToStream;
    mapping(address => uint256[]) public userToStream;

    struct StreamScheduled {
        uint256 schedule_id;
        address schedule_creator;
        string cover_cid;
        string s_title;
        string s_description;
        string time;
        string rights;
        uint256 price;
        string s_video_id;
        bool isOver;
    }
    mapping(uint256 => StreamScheduled) public idToScheduledStream;
    mapping(address => uint256[]) public userToScheduledStream;

    struct Creator {
        address creator;
        string creatorName;
        string photo_cid;
        uint256[] tokens;
    }
    mapping(address => Creator) public creatorInfo;

    mapping(uint256 => address[]) public allowedWatchers;

    uint256 scheduleStreamId;
    uint256 streamId;

    function createProfile(
        address user,
        string memory name,
        string memory photo
    ) public {
        if (!isAdded[user]) {
            users.push(user);
            isAdded[user] = true;
        }
        creatorInfo[user].creator = user;
        creatorInfo[user].creatorName = name;
        creatorInfo[user].photo_cid = photo;
    }

    function createStream(
        address creator,
        string memory t,
        string memory d,
        string memory rights,
        string memory cid,
        string memory v_cid,
        bool isRecord
    ) public {
        streamId += 1;
        idToStream[streamId] = Stream(
            streamId,
            creator,
            t,
            d,
            rights,
            cid,
            v_cid,
            isRecord
        );
        userToStream[creator].push(streamId);
    }

    function scheduleStream(
        address creator,
        string memory cid,
        string memory title,
        string memory des,
        string memory time,
        string memory rights,
        uint256 price
    ) public {
        scheduleStreamId += 1;
        idToScheduledStream[scheduleStreamId] = StreamScheduled(
            scheduleStreamId,
            creator,
            cid,
            title,
            des,
            time,
            rights,
            price,
            "",
            false
        );
        userToScheduledStream[creator].push(scheduleStreamId);
    }

    function startStream(uint256 id, string memory v_id) public {
        idToScheduledStream[id].s_video_id = v_id;
        idToScheduledStream[id].isOver = true;
    }

    function bookSchdeuledStream(uint256 id, address watcher) public payable {
        uint256 p = idToScheduledStream[id].price;
        require(msg.value == p, "not enough value");
        allowedWatchers[id].push(watcher);
    }

    function createNFT(address user, uint256 tid) public {
        creatorInfo[user].tokens.push(tid);
    }

    function buyNFT(address user, uint256 tid) public {
        creatorInfo[user].tokens.push(tid);
    }

    function getAllStream(uint256 id) public view returns (Stream memory) {
        return idToStream[id];
    }

    function getAllScheduledStreams(uint256 id)
        public
        view
        returns (StreamScheduled memory)
    {
        return idToScheduledStream[id];
    }

    function getAllUsers() public view returns (address[] memory) {
        return users;
    }

    function getAllowedWatcher(uint256 id)
        public
        view
        returns (address[] memory)
    {
        return (allowedWatchers[id]);
    }

    function getCreator(address user) public view returns (Creator memory) {
        return creatorInfo[user];
    }

    function getTotalStream(address user) public view returns (uint256) {
        return userToStream[user].length;
    }

    function getTotalScheduledStreams(address user)
        public
        view
        returns (uint256)
    {
        return userToScheduledStream[user].length;
    }

    function getTotal(address user) public view returns (uint256) {
        return userToStream[user].length + userToScheduledStream[user].length;
    }

    function getStreamId(address user) public view returns (uint256[] memory) {
        return (userToStream[user]);
    }

    function getTotalStreamNumber() public view returns (uint256) {
        return streamId;
    }

    function getTotalScheduledNumber() public view returns (uint256) {
        return scheduleStreamId;
    }
}
