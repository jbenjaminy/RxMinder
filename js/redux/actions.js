        this.props.dispatch(actions.fetchMedsSched());
        addMed
        this.editMed = this.editMed.bind(this);
        this.deleteMed = this.deleteMed.bind(this);
        this.submitEdit = this.deleteMed.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);