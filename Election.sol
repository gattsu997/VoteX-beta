pragma solidity 0.5.16;

contract Election {
    
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }
    uint256 lastRun=now;


    mapping(address => bool) public voters;
    
    mapping(uint => Candidate) public candidates;
    uint public candidatesCount;

    event votedEvent (
        uint indexed _candidateId
    );

    constructor  () public {
        addCandidate("Candidate 1");
        addCandidate("Candidate 2");
    }

    function addCandidate (string memory _name) private {
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function vote (uint _candidateId) public {

        require(block.timestamp - lastRun < 2 minutes, 'Time up');
        require(!voters[msg.sender]);

        require(_candidateId > 0 && _candidateId <= candidatesCount);

        voters[msg.sender] = true;  

        candidates[_candidateId].voteCount ++;

        emit votedEvent(_candidateId);
    }
}
