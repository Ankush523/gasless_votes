//SPDX-License-Identifier:MIT

pragma solidity ^0.8.0;

contract Vote{

    uint uid;
    uint cid;

    struct User{
        uint uid;
        string name;
        uint age;
        string contactnumber;
        string sex;
        address user;
        bool votegiven;
    }


    struct Candidate{
        uint cid;
        string name;
        string party_name;
        uint age;
        string region;
        address Candidate;
        uint count;
    }

    mapping(address => User) voter;
    mapping(uint => Candidate) candidate;

    function receiveUid() external view returns(uint) {
        return uid;
    }


    function receiveCid() external view returns(uint) {
        return cid;
    }

    function userregister(string memory _name,uint _age,string memory _contactnumber,string memory _sex) external{
        ++uid;
        voter[msg.sender] = User(uid,_name,_age,_contactnumber,_sex,msg.sender,false);
    }

    function candidateregister(string memory _name, string memory _party_name,uint _age,string memory _region) external{
        ++cid;
        candidate[cid] = Candidate(cid,_name,_party_name,_age,_region,msg.sender,0);
    }

    function candidatelist(uint _cid) public view returns (Candidate memory)
    {
        return candidate[_cid];
    }

    function voting() external {
        require(voter[msg.sender].votegiven == false);
        voter[msg.sender].votegiven = true;
    }

    function votecount(uint _cid) external {
            candidate[_cid].count++;
    }
}