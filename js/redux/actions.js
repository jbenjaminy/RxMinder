        this.props.dispatch(actions.fetchMedsSched());
        this.editMed = this.editMed.bind(this);
        this.deleteMed = this.deleteMed.bind(this);
        this.submitEdit = this.deleteMed.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);