function advertisementsCollection() {
    var compiled = _.template(`<div class="col">
                <div class="card flex-md-row mb-4 shadow-sm h-md-250">
                    <div class="card-body d-flex flex-column align-items-start">
                        <h6 class="mb-0">
                            <a class="text-dark" href="/advertisements/<%- data['id'] %>"><%- data['title'] %></a>
                        </h6>
                        <div class="mb-1 text-muted small">Сегодня (дата)</div>
                        <p class="card-text mb-auto"> {{ title }}.</p>
                        <p class="card-text mb-auto"> {{ data_res }}.</p>
                        <p class="card-text mb-auto"> {{ data_req }}.</p>
                        <a class="btn btn-outline-primary btn-sm" role="button" href="http://www.jquery2dotnet.com/">
                           Приять участие
                        </a>
                    </div>
                    <img class="card-img-right flex-auto d-none d-lg-block" alt="Thumbnail [200x250]"
                         src="//placeimg.com/250/250/arch" style="width: 200px; height: 250px;">
                </div>
            </div>
    `);
    $.ajax({
        url: "https://jsonplaceholder.typicode.com/todos",
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        cache: false,
        timeout: 5000,
        complete: function () {
            //called when complete
            console.log('process complete');
        },
        success: function (data) {
            _.forEach(data, function (value) {
                $('#data-array').append(compiled({data: value}));
            });
            console.log(data);
            console.log('process sucess');
        },

        error: function () {
            console.log('process error');
        },
    });
};

$(document).ready(function () {
    if ($('[data-class="Advertisements"]')) {
        advertisementsCollection();
    }
    console.log('start');
});
