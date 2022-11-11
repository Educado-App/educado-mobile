const { CreateDirectory } = require('../services/DirectoryService');

import { React } from 'react'
import * as FileSystem from 'expo-file-system';

var expect = require('chai').expect;

describe('Our application', function() {

  it('should understand basic mathematical principles', function() {

    //expect(5).to.equal(5);
    //expect(5).to.not.equal(3);

    expect(CreateDirectory("Test")).to.equal("Created directory: Test")

  });

});