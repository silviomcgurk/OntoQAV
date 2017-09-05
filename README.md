# OntoQAV
Repository for OntoQAV, the Ontology Quality Assessment Visualisation plug-in for Luzzu and WebVOWL

For a demonstration of this pipeline, please visit either of these two pages:

1. For a demonstration using pre-configured, pre-loaded set of ontologies (the user is able to select which of those ontologies to assess), please visit http://ontoqav.publicvm.com/evaluation/preconf

2. For an open demonstration whereby the user can upload an ontology file or point to its URI, please visit http://ontoqav.publicvm.com/evaluation/openconf




This project creates a pipeline between:

Luzzu -> a quality assessment framework for Linked Data and ontologies, and
WebVOWL -> a tool to visualise concepts and properties in ontologies.

The pipeline includes three stages:

1. The user selects the ontology to be evaluated and the metrics against which evaluation will take place.

2. The ontology and metric configuration (from Stage 1) is fed to Luzzu, which provides a Problem Quality Report.

3. Ontology visualisation takes places by:

    3a. The ontology being evaluated is fed to WebVOWL and visualised without quality information.
    
    3b. OntoQAV augments visualisation by modifying the DOM structure through information obtained from Luzzu's Problem Quality Report.
