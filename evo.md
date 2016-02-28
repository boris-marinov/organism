# Data

## PhysicalConstants

Global constants which represent physical tradeoffs in the system, which don’t allow for organisms to evolve too much. 

## EnvironmentState

A holds the main grid of all organisms.

## OrganismConstants

Values about the organism which never change during its lifetime: speed, sight, size. Can be represented as numbers. Constants are configured when the organism breeds.

## OrganismCapabilities

Derived from the PhysicalConstants and the OrganismConstants, the capabilities of an organism signify how fast it is supposed to move, how far he sees and how much energy does it require.

## OrganismState

The physical state of an organism for a given moment - health, remaining energy etc.

## EnvironmentInput

Contains all the information that a given organism sees at a given time. This datastructure is uniform for all organisms, that is, it is _objective_. 


# Functions

#`(OrganismCapabilities, OrganismState) => OrganismCapabilities

Corrects the organism capabilities based on its current state

#`(OrganismCapabilities, EnvironmentState) => EnvironmentInput`

Computes what portion of the environment state a given organism will see, given its Capabilities.

#`(EnvironmentInput, OrganismState, OrganismMemories) => [OrganismMemories, OrganismAction]`

Takes the state of the organism, what he remembers and what he sees, and generates a new state which "absorbes" the new information. The organism may also wish to act on the new situation in which case an action is generated.

#` (EnvironmentState, OrganismAction) => OrganismState

Applies an action to the state.


