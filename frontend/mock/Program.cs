var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapGet("/images", (int start, int count) =>
{
    int[] elements = new int[count];
    for(int i = 0; i < count; i++){
        elements[i] = start + i;
    }
    return Results.Ok(elements);
})
.WithOpenApi();

app.Run();
