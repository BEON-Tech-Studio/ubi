interface IProofOfHumanity {
  function isRegistered(address _submissionID)
    external
    view
    returns (
      bool registered
    );
}

contract FakeProofOfHumanity {
    function isRegistered(address _submissionID) external view returns (bool) {
        return true;
    }
}